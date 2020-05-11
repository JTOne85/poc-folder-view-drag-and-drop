import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatTreeModule } from "@angular/material/tree";
import { MatIconModule } from "@angular/material/icon";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { FolderViewComponent } from "./folder-view/folder-view.component";

@NgModule({
  imports: [BrowserModule, FormsModule, MatTreeModule, MatIconModule, DragDropModule],
  declarations: [AppComponent, HelloComponent, FolderViewComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
