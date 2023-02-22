import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  images: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.images = [
      {
        previewImageSrc: '../../assets/images/shooting-script.jpg',
        thumbnailImageSrc: '../../assets/images/shooting-script.jpg'
      },
      {
        previewImageSrc: '../../assets/images/film-movie.jpg',
        thumbnailImageSrc: '../../assets/images/film-movie.jpg'
      },
      {
        previewImageSrc: '../../assets/images/film-making.jpg',
        thumbnailImageSrc: '../../assets/images/film-making.jpg'
      }
    ];
  }
}
