import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../shared/interfaces/post';

@Injectable()
export class PostService {
  isLoaded = false;

  constructor(private http: HttpClient) {}

  loadAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/posts`);
  }
}