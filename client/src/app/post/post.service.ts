import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from '../shared/interfaces/post';

@Injectable()
export class PostService {
  isLoaded = false;

  constructor(private http: HttpClient) {}

  loadProfilePosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/posts/user`);
  }

  loadAllPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`/posts`);
  }

  createPost(data): Observable<IPost[]> {
    return this.http.post<IPost[]>(`/posts`, data);
  }
}
