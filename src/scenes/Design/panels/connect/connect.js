import openConnectPanel from './openConnectPanel'

export default editor => {
  const panels = editor.Panels
  const commands = editor.Commands

  const openConnect = 'open-connect'

  commands.add(openConnect, openConnectPanel)

  panels.addButton('views', {
    id: openConnect,
    command: openConnect,
    className: 'fa fa-cubes'
  })

  panels.addPanel({
    id: 'connect',
    visible: false
  })
}
