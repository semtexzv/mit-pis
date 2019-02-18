package cz.vutbr.pis.proj.util

import kotlin.reflect.KMutableProperty0
import kotlin.reflect.KMutableProperty1
import kotlin.reflect.KProperty

class Alias<T, R>(@Transient val recv: KMutableProperty0<R>, @Transient val delegate: KMutableProperty1<R, T>) {
    init {

    }

    operator fun getValue(thisRef: Any?, property: KProperty<*>): T =
            delegate.get(recv.get()!!)

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
        delegate.set(recv.get()!!, value)
    }
}