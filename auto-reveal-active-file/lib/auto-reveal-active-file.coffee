AutoRevealActiveFileView = require './auto-reveal-active-file-view'
{CompositeDisposable} = require 'atom'

module.exports = AutoRevealActiveFile =
  autoRevealActiveFileView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @autoRevealActiveFileView = new AutoRevealActiveFileView(state.autoRevealActiveFileViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @autoRevealActiveFileView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'auto-reveal-active-file:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @autoRevealActiveFileView.destroy()

  serialize: ->
    autoRevealActiveFileViewState: @autoRevealActiveFileView.serialize()

  toggle: ->
    console.log 'AutoRevealActiveFile was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
