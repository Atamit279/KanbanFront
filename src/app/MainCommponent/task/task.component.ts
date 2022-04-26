import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Column} from "../../models/column.model";
import {Board} from "../../models/board.model";
import {MatDialog} from "@angular/material/dialog";
import {TaskDTO} from "../../../@cores/dtos/TaskDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../@cores/task.service";
import {DialogComponent} from "../Dialog/dialog/dialog.component";
import {DialogTaskComponent} from "../Dialog/dialog-task/dialog-task.component";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  public id: number = 0;
  public mainPage: TaskDTO = new TaskDTO();
  public form!: FormGroup;

  constructor(
    public dialog: MatDialog,
    public taskService: TaskService,
    public formBuilder: FormBuilder,

  ) {
  }


  board: Board = new Board('Test Board', [
    new Column('Todo', [

    ]),
    new Column('InProgress', [

    ]),
    new Column('Done', [
      ])
  ]);


  //Method to get all data
getAll(): void {
  this.taskService.getAll().subscribe(data => {
    for (let i = 0; i < this.board.columns.length; i++) {
      for (let j = 0; j < data.length; j++){
      if (this.board.columns[i].name === data[j].status) {
        this.board.columns[i].tasks.push(data[j].name)
      }
      }
    }
  });
}


//Method to save data after drag and drop
update(taskDTO: TaskDTO): void {
      this.taskService.update(taskDTO).subscribe(() => {
    });
}


//Form validation and set default data
  initForm(data?: TaskDTO): void {
    this.form = this.formBuilder.group({
      id: [[data && data.id ? data.id : [0]]],
      name: [[data && data.name ? data.name : ''], [Validators.required]],
      description: [[data && data.description ? data.description : ''], [Validators.required]],
      status: [[data && data.status ? data.status : ''], [Validators.required]],
      priority: [[data && data.priority ? data.priority : ""], [Validators.required]]
    },)
  }


  ngOnInit(): void {
  this.getAll();
  this.initForm();
  }


  //event Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,

      );

      //Search and save data after drag and drop
      this.taskService.getAll().subscribe(data => {
        for (let j = 0; j < data.length; j++){
          if (event.container.data[event.currentIndex] === data[j].name) {
            for (let i = 0; i < this.board.columns.length; i++){
              for (let k = 0; k < this.board.columns[i].tasks.length; k++){
                if (this.board.columns[i].tasks[k] === data[j].name){
                  data[j].status = this.board.columns[i].name;
                  this.update(data[j])
                }
              }
            }
          }
        }
      });
    }
  }


  //DialogCreateTask
  openDialog() {
   this.dialog.open(DialogComponent).afterClosed().subscribe(response =>{
     this.board.columns[0].tasks.push(response.data.name);
   });
  }


//DialogUpdateOrDeleteTask
  openDialogTask(event: any) {
    this.taskService.getAll().subscribe(data => {
      for (let j = 0; j < data.length; j++){
        if (event.target.innerText === data[j].name) {
          for (let i = 0; i < this.board.columns.length; i++){
            for (let k = 0; k < this.board.columns[i].tasks.length; k++){
              if (this.board.columns[i].tasks[k] === data[j].name){
                const dialog = this.dialog.open(DialogTaskComponent,
                  {data: {priority: data[j].priority,
                                name: data[j].name,
                                description: data[j].description,
                                status: data[j].status,
                                id: data[j].id}});
                dialog.afterClosed().subscribe(() => {
                  window.location.reload();
                });

              }
            }
          }
        }
      }
    });
  }
}
