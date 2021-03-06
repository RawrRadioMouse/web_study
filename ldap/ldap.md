#### LDAP Authentication bypass
some LDAP servers authorise NULL Bind: if null values are sent, the LDAP server will proceed to bind the connection, and the PHP code will think that the credentials are correct.  
To get the bind with 2 null values, you will need to completely remove this parameter from the query.  
If you keep something like username=&password= in the URL, these values will not work, since they won't be null; instead, they will be empty.  

EG tamper with request in Burp or simply remove all form fields in dev tools.  
_**This is an important check to perform on all login forms that you will test in the future, even if the backend is not LDAP-based.**_

#### LDAP injection

The most common pattern of LDAP injection is to be able to inject in a filter. Here, we will see how you can use LDAP injection to bypass an authentication check.

First, you need to learn a bit of LDAP syntax. When you are retrieving a user, based on its username, the following will be used:

(cn=[INPUT])
If you want to add more conditions and some boolean logic, you can use:

 * A boolean OR using `|: (|(cn=[INPUT1])(cn=[INPUT2]))` to get records matching `[INPUT1]` or `[INPUT2]`.
 * A boolean AND using `&: (&(cn=[INPUT1])(userPassword=[INPUT2]))` to get records for which the cn matches `[INPUT1]` and the password matches `[INPUT2]`.  

As you can see, the boolean logic is located at the beginning of the filter. Since you're likely to inject after it, it's not always possible (depending on the LDAP server) to inject logic inside the filter, if it's just `(cn=[INPUT])`.

LDAP uses the wildcard `*` character very often, to match any values. This can be used for match everything `*` or just substrings (for example, `adm*` for all words starting with adm).

As with other injections, we will need to remove anything added by the server-side code. We can get rid of the end of the filter, using a NULL BYTE (encoded as `%00`).

Here, we have a login script. We can see that if we use:

 * `username=hacker&password=hacker` we get authenticated (this is the normal request).
 * `username=hack*&password=hacker` we get authenticated (the wildcard matches the same value).
 * `username=hacker&password=hac*` we don't get authenticated (the password may likely be hashed).  
Now, we will see how we can use the LDAP injection, in the username parameter to bypass the authentication. Based on our previous tests, we can deduce that the filter probably looks like:

`(&(cn=[INPUT1])(userPassword=HASH[INPUT2]))`
Where HASH is an unsalted hash (probably MD5 or SHA1).

LDAP supports several formats: `{CLEARTEXT}`, `{MD5}`, `{SMD5}` (salted MD5), `{SHA}`, `{SSHA}` (salted SHA1), `{CRYPT}` for storing passwords.
Since [INPUT2] is hashed, we cannot use it to inject our payload.

Our goal here will be to inject inside [INPUT1] (the username parameter). We will need to inject:

 * The end of the current filter using hacker).
 * An always-true condition `((cn=*)` for example)
 * A ) to keep a valid syntax and close the first (.
 * A NULL BYTE (%00) to get rid of the end of the filter.  
 
Once you put this together, you should be able to login as hacker with any password. You can then try to find other users using the wildcard trick. For example, you can use a* in the first part of the filter, and check who you are logged in as.

In most cases, LDAP injection will allow only you to bypass authentication and authorisation checks. Retrieving arbitrary data (as opposed to just getting more results) is often really challenging or impossible.
