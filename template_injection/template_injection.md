#### Sometimes when user input is accepted, either intentional or unintentional we get XSS, sometimes this also means we cen get template injection

[Report on Template Injection](https://portswigger.net/research/server-side-template-injection)

test with `{{'7'*7}}`

`{{''.__class__.mro()[1].__subclasses__()}}`

Check the report carefully, as you can see that the `__` are hidden due to the processing of the data as Markdown in the initial report.
You may need to change the value 1 to get the list of interesting functions. Once you get it, you will need to find one that will give you code execution. You can use the following payload to get access to <class 'subprocess.Popen'>:

`{{''.__class__.mro()[1].__subclasses__()[X]}}`
Where X is the integer you need to find.

Finally, you can call this method using:

`{{''.__class__.mro()[1].__subclasses__()[X](COMMAND)}}`
Where:

`X` was found previously.
`COMMAND` is the command you want to run.
Make sure you read the Python documentation for the popen to make sure you have get the right syntax for the command (or add the right option).