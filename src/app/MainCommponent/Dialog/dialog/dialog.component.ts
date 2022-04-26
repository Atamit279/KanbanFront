import {Component, Inject, OnInit} from '@angular/core';
import {TaskDTO} from "../../../../@cores/dtos/TaskDTO";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../../@cores/task.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


export enum Priority{
  Low = "Low",
  Medium = "Medium",
  Epic = "Epic",
}


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  mainPage: TaskDTO = new TaskDTO();
  UniqName: boolean = false;


  constructor (
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    ){}


  ngOnInit(): void {
    this.initForm();
  }


  initForm(data?: TaskDTO): void {
    this.form = this.formBuilder.group({
      id: [[data && data.id ? data.id : [0]]],
      name: [[data && data.name ? data.name : ''], [Validators.required, Validators.minLength(4)]],
      description: [[data && data.description ? data.description : ''], [Validators.required, Validators.minLength(2)]],
      priority: [[data && data.priority ? data.priority : ""], [Validators.required, Validators.minLength(2)]]
    },)
  }


  getAll(): void {
    this.taskService.getAll().subscribe(() => {
    });
  }


  save(): void{
    this.taskService.getAll().subscribe(data => {
      for (let i = 0; i < data.length; i++){
        if (data[i].name === this.form.get('name')?.value) {
          this.UniqName = true;
          alert("This Task name already exists");
          break;
        }
      }
        if (!this.UniqName) {
          this.mainPage.name = this.form.get('name')?.value;
          this.mainPage.description = this.form.get('description')?.value;
          this.mainPage.status = "Todo";
          this.mainPage.priority = this.form.get('priority')?.value;
          this.taskService.save(this.mainPage).subscribe(() => {
          });
          this.dialogRef.close({ data: {name: this.form.get('name')?.value }});
        }
        this.UniqName = false;
    })
  }

}
