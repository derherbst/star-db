когда комп создается и первый разотобр на странице
MOUNTING
----
constructor() => render() => componentDidMount()


комп уже отображен и может получать обновления
UPDATE
----
New Props
            => render() => componentDidUpdate()
setState


комп не нужен и удаляется
UNMOUNTING
----
componentWillUnmount()


получение ошибки. обработка непойманных ошибок в дргуих эл-тах жизненного цикла реакт компонента
ERROR
----
componentDidCatch()
