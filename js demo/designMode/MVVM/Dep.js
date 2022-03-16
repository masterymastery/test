class Dep {
    constructor() {
        this.Events = []
    }

    add(watcher) {
        this.Events.push(watcher)
    }

    remove(key) {

    }

    notify(key) {
        this.Events.forEach(watcher => {
            watcher.update()
        })
    }


}