import { Component, EventEmitter, Input, Output } from "@angular/core";
import {
  MatTreeFlatDataSource,
  MatTreeFlattener
} from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { CdkDragDrop } from '@angular/cdk/drag-drop';

export class FolderNode implements IFolderNode {
  constructor(
    public id: string,
    public name: string,
    public children?: FolderNode[]
  ) {}
}

interface IFolderNode {
  id: string;
  name: string;
  children?: FolderNode[];
}
const TREE_DATA = [
  {
    id: "1",
    name: "Root folder",
    children: [
      {
        id: "2",
        name: "first level",
        children: [
          { id: "3", name: "first child" },
          { id: "4", name: "first sibling" },
          { id: "5", name: "second sibling " }
        ]
      },
      {
        id: "6",
        name: "first level sibling",
        children: [
          { id: "7", name: "first child" },
          { id: "8", name: "first sibling" },
          {
            id: "9",
            name: "second sibling",
            children: [
              { id: "3", name: "first child" },
              { id: "4", name: "first sibling" },
              { id: "5", name: "second sibling " }
            ]
          }
        ]
      }
    ]
  }
];

interface FolderFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id: string;
}

@Component({
  selector: "folder-view",
  templateUrl: "./folder-view.component.html",
  styleUrls: ["./folder-view.component.css"]
})
export class FolderViewComponent {
  @Input() item: FolderFlatNode;
  @Input() parentItem?: FolderFlatNode;
  @Input() public set connectedDropListsIds(ids: string[]) {
    this.allDropListsIds = ids;
  }

  public allDropListsIds: string[];
  public get dragDisabled(): boolean {
    return !this.parentItem;
  }

  public get parentItemId(): string {
    return this.dragDisabled ? "" : this.parentItem.id
  }

  private _transformer = (node: FolderNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level
    };
  };

  @Output() itemDrop: EventEmitter<CdkDragDrop<FolderFlatNode>>

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  treeControl = new FlatTreeControl<FolderFlatNode>(
    node => node.level,
    node => node.expandable
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node: FolderFlatNode) => node.expandable;
}
