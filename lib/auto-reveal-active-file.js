'use strict';

module.exports = {

    config: {},

    observer: null,

    isTreeViewOpen: function()
    {
        var panelView, treeView, treeViewPkg;

        if (!(atom.packages.isPackageLoaded('tree-view') && atom.packages.isPackageActive('tree-view')))
        {
            return false;
        }

        treeViewPkg = atom.packages.getActivePackage('tree-view');
        treeView = treeViewPkg.mainModule.treeView;
        if (!(treeView && treeView.panel))
        {
            return false;
        }

        panelView = atom.views.getView(treeView.panel);

        if (panelView.parentNode == null)
        {
            return false;
        }

        return true;
    },

    activate: function() {
        if (!this.observer)
        {
            this.observer = atom.workspace.observeActivePaneItem(function()
            {
                if(this.isTreeViewOpen())
                {
                    workspaceView = atom.views.getView(atom.workspace);
                    atom.commands.dispatch(workspaceView, 'tree-view:reveal-active-file');
                }
            });
        }
    },

    deactivate: function()
    {
        if (this.observer)
        {
            this.observer.dispose();
            this.observer = null;
        }
    }
};
