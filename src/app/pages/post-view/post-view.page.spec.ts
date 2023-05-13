import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostViewPage } from './post-view.page';

describe('PostViewPage', () => {
  let component: PostViewPage;
  let fixture: ComponentFixture<PostViewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PostViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
