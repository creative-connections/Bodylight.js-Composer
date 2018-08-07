/**
 * Implements a rudimentary browser console logger for the FMU.
 */
export default function consoleLogger (componentEnvironment, instanceName, status, category, message, other) {
  /* Fills variables into message returned by the FMU, the C way */
  const formatMessage = (message, other) => {
    // get a new pointer
    let ptr = this._malloc(1)
    // get the size of the resulting formated message
    let num = this.snprintf(ptr, 0, message, other)
    this._free(ptr)
    num++ // TODO: Error handling num < 0
    ptr = this._malloc(num)
    this.snprintf(ptr, num, message, other)

    // return pointer to the resulting message string
    return ptr
  }

  console.log('FMU(' + this.UTF8ToString(instanceName) +
    ':' + status + ':' +
    this.UTF8ToString(category) +
    ') msg: ' + this.UTF8ToString(formatMessage(message, other))
  )

  this._free(formatMessage)
}
