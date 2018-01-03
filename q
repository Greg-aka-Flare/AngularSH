[1mdiff --cc shrpr/src/app/core/curious/curious-mobile/curious-mobile.component.html[m
[1mindex 5db8896,bf50350..0000000[m
[1m--- a/shrpr/src/app/core/curious/curious-mobile/curious-mobile.component.html[m
[1m+++ b/shrpr/src/app/core/curious/curious-mobile/curious-mobile.component.html[m
[36m@@@ -7,15 -7,9 +7,15 @@@[m
      >[m
          <div class="category">[m
              {{ course?.categories[0]?.name }}[m
[31m--[m
[31m -            <figure class="rating" *ngIf="course?.rating">[m
[31m -                <star-rating-comp [starType]="'svg'" [rating]="course?.rating" [showHalfStars]="true" [readOnly]="true"></star-rating-comp>[m
[32m++            [m
[32m +            <figure class="rating">[m
[32m +                <star-rating-comp [m
[32m +                    [starType]="'svg'" [m
[32m +                    [showHalfStars]="true" [m
[32m +                    [readOnly]="true"[m
[32m +                    rating="{{ course?.rating || 0 }}"[m
[32m +                >[m
[32m +                </star-rating-comp>[m
              </figure><!-- .rating -->[m
          </div><!-- .category -->[m
  [m
[1mdiff --cc shrpr/src/app/core/user.service.ts[m
[1mindex 4c05311,a1253b7..0000000[m
[1m--- a/shrpr/src/app/core/user.service.ts[m
[1m+++ b/shrpr/src/app/core/user.service.ts[m
[1mdiff --git a/shrpr/src/app/core/curious/curious-desktop/curious-desktop.component.html b/shrpr/src/app/core/curious/curious-desktop/curious-desktop.component.html[m
[1mindex f483b30..80115cb 100644[m
[1m--- a/shrpr/src/app/core/curious/curious-desktop/curious-desktop.component.html[m
[1m+++ b/shrpr/src/app/core/curious/curious-desktop/curious-desktop.component.html[m
[36m@@ -1,17 +1,17 @@[m
 <section [m
[31m-    id="for_fun_box" [m
[31m-    class="category_bucket magento"[m
[31m-    *ngIf="showFun"[m
[31m->    <a class="show-more" routerLink="/courses/list/for-fun">View All</a>[m
[31m-    <h2>For Fun</h2>[m
[32m+[m[32m    id="for_work_box"[m[41m [m
[32m+[m[32m    class="category_bucket blue"[m
[32m+[m[32m    *ngIf="showWork"[m
[32m+[m[32m><a class="show-more" routerLink="/courses/list/for-work">View All</a>[m
[32m+[m[32m    <h2>For Work</h2>[m
 [m
     <div [m
         class="thee_col_content clearfix"[m
[31m-        *ngIf="forFun?.length > 0"[m
[32m+[m[32m        *ngIf="forWork?.length > 0"[m
     >[m
         <article [m
             class="card-box" [m
[31m-            *ngFor="let course of forFun; let i = index" [m
[32m+[m[32m            *ngFor="let course of forWork; let i = index"[m[41m  [m
             [@state]="course?.state"[m
         >[m
             <div class="img-ctn">[m
[36m@@ -19,15 +19,16 @@[m
                     ${{ course?.semesters[0]?.amount }}[m
                 </div><!-- .price -->[m
 [m
[31m-                <figure><a [routerLink]="['/courses', course.id]">[m
[31m-                 <img *ngIf="course?.semesters[0]?.primary_img" src="../../assets/img/courses/{{ course?.semesters[0]?.primary_img }}" alt="" title="">[m
[31m-                 <img *ngIf="!course?.semesters[0]?.primary_img" src="../../assets/img/course-picture.jpg" alt="" title=""></a>[m
[32m+[m[32m                <figure>[m
[32m+[m[32m                        <a [routerLink]="['/courses', course.id]"><img *ngIf="course?.semesters[0]?.primary_img" src="../../assets/img/courses/{{ course?.semesters[0]?.primary_img }}" alt="" title="">[m
[32m+[m[32m                        <img *ngIf="!course?.semesters[0]?.primary_img" src="../../assets/img/course-picture.jpg" alt="" title=""></a>[m
                 </figure>[m
 [m
                 <div class="like_action">[m
                     <a [m
                         class="hollow-icon thumbUp" [m
                         (click)="onLike(course, i)"[m
[32m+[m[32m                        [class.like]="course?.state == 'like'"[m
                     >[m
                         <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>[m
                     </a>[m
[36m@@ -35,6 +36,7 @@[m
                     <a [m
                         class="hollow-icon thumbDown" [m
                         (click)="onDislike(course, i)"[m
[32m+[m[32m                        [class.dislike]="course?.state == 'dislike'"[m
                     >[m
                         <i class="fa fa-thumbs-o-down" aria-hidden="true"></i>[m
                     </a>[m
[36m@@ -59,11 +61,11 @@[m
 [m
                 <h3>[m
                     <a [routerLink]="['/courses', course?.id]">{{ course?.title }}</a>[m
[31m-                </h3><div class="location-wrap">[m
[32m+[m[32m                </h3>[m
[32m+[m[32m                <div class="location-wrap">[m
                 <p class="location">[m
                     <i class="fa fa-map-marker" aria-hidden="true"></i> [m
[31m-                    <a href="javascript:void(0);">{{ course?.semesters[0]?.addresses[0]?.city }}, {{ course?.semesters[0]?.addresses[0]?.state }}</a>[m
[31m-                </p><!-- .location -->[m
[32m+[m[32m                    <a href="javascript:void(0);">{{ course?.semesters[0]?.addresses[0]?.city }}, {{ course?.semesters[0]?.addresses[0]?.state }}</a></p><!-- .location -->[m
 [m
                 <p class="date">[m
                     <i class="fa fa-calendar" aria-hidden="true"></i> [m
[36m@@ -77,9 +79,9 @@[m
 [m
     <section [m
         class="suggest-course"[m
[31m-        *ngIf="forFun?.length === 0"[m
[32m+[m[32m        *ngIf="forWork?.length === 0"[m
     >[m
[31m-        <form [formGroup]="suggestForm" (ngSubmit)="onSuggest(0)">[m
[32m+[m[32m        <form [formGroup]="suggestForm" (ngSubmit)="onSuggest(1)">[m
             <h1>Suggest Course:</h1>[m
 [m
             <p>We're sorry we don't have anymore courses to recommend. Please tell us about some courses you would like to see:</p>[m
[36m@@ -93,22 +95,22 @@[m
             <button>Submit</button>[m
         </form>[m
     </section><!-- .suggest-form -->[m
[31m-</section><!-- #for_fun_box -->[m
[32m+[m[32m</section><!-- #for_work_box -->[m
 [m
 <section [m
[31m-    id="for_work_box" [m
[31m-    class="category_bucket blue"[m
[31m-    *ngIf="showWork"[m
[31m-><a class="show-more" routerLink="/courses/list/for-work">View All</a>[m
[31m-    <h2>For Work</h2>[m
[32m+[m[32m    id="for_fun_box"[m[41m [m
[32m+[m[32m    class="category_bucket magento"[m
[32m+[m[32m    *ngIf="showFun"[m
[32m+[m[32m>    <a class="show-more" routerLink="/courses/list/for-fun">View All</a>[m
[32m+[m[32m    <h2>For Fun</h2>[m
 [m
     <div [m
         class="thee_col_content clearfix"[m
[31m-        *ngIf="forWork?.length > 0"[m
[32m+[m[32m        *ngIf="forFun?.length > 0"[m
     >[m
         <article [m
             class="card-box" [m
[31m-            *ngFor="let course of forWork; let i = index"  [m
[32m+[m[32m            *ngFor="let course of forFun; let i = index"[m[41m [m
             [@state]="course?.state"[m
         >[m
             <div class="img-ctn">[m
[36m@@ -116,16 +118,15 @@[m
                     ${{ course?.semesters[0]?.amount }}[m
                 </div><!-- .price -->[m
 [m
[31m-                <figure>[m
[31m-                        <a [routerLink]="['/courses', course.id]"><img *ngIf="course?.semesters[0]?.primary_img" src="../../assets/img/courses/{{ course?.semesters[0]?.primary_img }}" alt="" title="">[m
[31m-                        <img *ngIf="!course?.semesters[0]?.primary_img" src="../../assets/img/course-picture.jpg" alt="" title=""></a>[m
[32m+[m[32m                <figure><a [routerLink]="['/courses', course.id]">[m
[32m+[m[32m                 <img *ngIf="course?.semesters[0]?.primary_img" src="../../assets/img/courses/{{ course?.semesters[0]?.primary_img }}" alt="" title="">[m
[32m+[m[32m                 <img *ngIf="!course?.semesters[0]?.primary_img" src="../../assets/img/course-picture.jpg" alt="" title=""></a>[m
                 </figure>[m
 [m
                 <div class="like_action">[m
                     <a [m
                         c