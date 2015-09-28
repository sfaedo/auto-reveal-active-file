module.exports = {

    observer: null

,   activate: function()
    {
        if (!this.observer)
        {
            this.observer = atom.workspace.onDidChangeActivePaneItem(function()
            {
                var workspaceView = atom.views.getView(atom.workspace);
                atom.commands.dispatch(workspaceView, 'tree-view:reveal-active-file');
            });
        }
    }
};
