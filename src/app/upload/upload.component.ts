import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/Article';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public article: Article;
  @ViewChild('uploadForm') public uploadForm;
  private resArticle;
  public allowedFile = '.md'
  public inputEle: HTMLInputElement;

  constructor(private renderer: Renderer2,
    private articleService: ArticleService,
    private alertService: AlertService) {
    this.article = new Article();
  }

  public ngOnInit() {
  }

  public selectFile() {
    this.inputEle = document.getElementById('file-input') as HTMLInputElement;
    this.inputEle.dispatchEvent(new MouseEvent('click'));
    this.inputEle.addEventListener('change', this.fileChanged.bind(this));
  }

  public fileChanged(event: Event) {
    const file = event.target['files'][0] as File;
    const fileName = file.name;
    const extension = fileName.slice(fileName.lastIndexOf('.'), fileName.length);
    const allowExtensions = this.allowedFile.split(',');
    if (allowExtensions.find(item => item == extension)) {
      this.article.filename = fileName;
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onloadend = (event) => {
        this.article.content = event.target['result'];
      }
    } else {
      this.alertService.error('文件格式不支持!');
    };
  }

  public submit() {
    // this.alertService.error('文件格式不支持!');
    this.articleService.create(this.article).subscribe((res) => {
      this.inputEle.value = '';
      this.alertService.success('上传成功。');
      this.uploadForm.reset();
      this.article = new Article();
    })
  }
}
