import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ReloadService } from '../../../shared/service/reload.service';
import { BlogService } from './news-service/blog.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-News',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.css']
})
export class NewsComponent implements OnInit, AfterViewInit {

  blogs: any[] = [];
  private blogSub!: Subscription;


  constructor(private reload: ReloadService,
    private blogService: BlogService,
    private router: Router) { }
  ngAfterViewInit(): void {
    this.reload.initializeLoader();
    this.setBackgroundImages();
  }

  setBackgroundImages(): void {
    document.querySelectorAll<HTMLElement>('.set-bg').forEach((element) => {
      const bg = element.getAttribute('data-setbg');
      if (bg) {
        element.style.backgroundImage = `url(${bg})`;
      }
    });
  }

  ngOnInit(): void {
    this.fetchBlogs();
  }

  ngOnDestroy(): void {
    if (this.blogSub) {
      this.blogSub.unsubscribe();
    }
    console.log('BlogComponent destroyed');
  }
  fetchBlogs(): void {
    this.blogSub = this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data;
        console.log("blogs : ", this.blogs);
      },
      error: (err) => console.error('Error fetching blogs:', err)
    });

  }


  routeToDetails(newsId: number) {
    console.log("news-details", newsId);
    this.router.navigate(['/pages/news-details', newsId]);
  }
}
