module.exports = {

    observer: null

,   activate: function()
    {
        if (!this.observer)
        {
            this.observer = atom.workspace.onDidChangeActivePaneItem(function()
            {
                var treeView = atom.packages.getActivePackage('tree-view');

                if (treeView && treeView.mainModule.treeView.isVisible())
                {
                    var activePane = atom.workspace.getActivePane()
                    ,   workspaceView = atom.views.getView(atom.workspace);

                    atom.commands.dispatch(workspaceView, 'tree-view:reveal-active-file');
                    activePane.activate();
                }
            });
        }
    }
};
