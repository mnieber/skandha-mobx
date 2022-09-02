# skandha-mobx

An extension of mnieber/skandha that uses mobx

## Note on the order of calling registerCtr

If you have nested containers, then you need to call registerCtr first on the child container.
The reason is that once MobX has made the parent container observable, then it's not possible
anymore to mutate the members of the nested child container.
