import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../../@cores/task.service";
import {TaskDTO} from "../../../../@cores/dtos/TaskDTO";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";


export enum Priority{
  Low = "Low",
  Medium = "Medium",
  Epic = "Epic",
}

@Component({
  selector: 'app-dialog-task',
  templateUrl: './dialog-task.component.html',
  styleUrls: ['./dialog-task.component.scss']
})
export class DialogTaskComponent implements OnInit {
  form!: FormGroup;
  mainPage: TaskDTO = new TaskDTO();
  selectedName = this.data.name;
  selectedStatus = new  FormControl(this.data.status);
  UniqName : boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {priority: string, name: string, description: string, status: string, id: number},
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) {}


  ngOnInit(): void {
    this.initForm();
    //this.getAll();
  }

  initForm(data?: TaskDTO): void {
    this.form = this.formBuilder.group({
      id: [data && data.id ? data.id : this.data.id],
      name: [data && data.name ? data.name : this.data.name, [Validators.required, Validators.minLength(1)]],
      description: [data && data.description ? data.description : this.data.description , [Validators.required, Validators.minLength(1)]],
      status: [data && data.status ? data.status : this.data.status, [Validators.required]],
      priority: [data && data.priority ? data.priority : this.data.priority, [Validators.required]]

    },)
  }

  //Save data method
  test(): void{
    this.taskService.getAll().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if ((data[i].name === this.form.get('name')?.value) && (data[i].name !== this.data.name)) {
          alert("This Task name already exists");
          this.UniqName = true;
          break;

        }
      }
      if (!this.UniqName) {
        console.log(this.data);
        this.data.description = this.form.get('description')?.value;
        this.data.status = this.form.get('status')?.value;
        this.data.priority = this.form.get('priority')?.value;
        this.data.name = this.form.get('name')?.value;
        this.update(this.data);
      }
      this.UniqName = false;
    });
  }


  deleteById(): void {
    this.taskService.deleteById(this.data.id).subscribe( () => {
    });
  }

  update(taskDTO: TaskDTO): void {
    this.taskService.update(taskDTO).subscribe(() => {
    });
  }

}
