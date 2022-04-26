import {Injector, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TaskComponent } from './MainCommponent/task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {createCustomElement} from "@angular/elements";
import {MatGridListModule} from '@angular/material/grid-list';
import {HttpClientModule} from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { LevelComponent } from './MainCommponent/play-area/level/level.component';
import {KanbanModule} from "@syncfusion/ej2-angular-kanban";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import { DialogComponent } from './MainCommponent/Dialog/dialog/dialog.component';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import { DialogTaskComponent } from './MainCommponent/Dialog/dialog-task/dialog-task.component';
import {TextareaAutosizeModule} from "ngx-textarea-autosize";




@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    LevelComponent,
    DialogComponent,
    DialogTaskComponent
  ],
  entryComponents: [DialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    KanbanModule,
    DragDropModule,
    MatDialogModule,
    KanbanModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    TextareaAutosizeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const mainPage = createCustomElement(TaskComponent, {injector: this.injector});
    customElements.define("main-page", mainPage)
  }
}
