import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from './challenge.model';
import { DayStatus } from './day.model';
import { take, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { constants } from '../../constants';

/**
 * @author Alessandro Alberga
 * @description challenges service for app state on challenges.
 */
@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  private firebaseRestUrl = constants.firebaseUrl;

  /**
   * Current challenge subscribable behaviour subject.
   */
  private _currentChallenge = new BehaviorSubject<Challenge>(null);

  constructor(private http: HttpClient) { }

  /**
   * Returns the created observable that will retrieve the challenge.
   */
  public fetchCurrentChallenge() {
    return this.http.get(`${this.firebaseRestUrl}/challenge.json`)
      .pipe(tap((res: any) => {
        if (res) {
          const loadedObject = new Challenge(
            res.title,
            res.description,
            res.year,
            res.month,
            res._days
          );
          this._currentChallenge.next(loadedObject);
        }
       }))
  }

  /**
   * Getter for current challenge observable.
   */
  public get currentChallenge(): Observable<Challenge> {
    // Can't call next on this, only observe!
    return this._currentChallenge.asObservable();
  }

  /**
   * Create and emit new challenge.
   *
   * @param title title of challenge
   * @param description description of challenhe
   */
  public createNewChallenge(title: string, description: string) {
    const challenge = new Challenge(
      title,
      description
    )
    // Save to server.
    this.saveToServer(challenge);
    this._currentChallenge.next(challenge);
  }

  /**
   * Udate the existing challenge.
   *
   * @param title title of challenge.
   * @param description description of challenge.
   */
  public updateChallenge(title: string, description: string) {
    this._currentChallenge.pipe(take(1)).subscribe(challenge => {
      challenge.title = title;
      challenge.description = description;
      // Save to server.
      this.saveToServer(challenge);
      this._currentChallenge.next(challenge)
    })
  }

  /**
   * Update a day's status.
   *
   * @param dayInMonth numerical day in month.
   * @param status status to change it to.
   */
  public updateDayStatus(dayInMonth: number, status: DayStatus): void {
    this._currentChallenge.pipe(take(1)).subscribe((challenge: Challenge) => {
      if (!challenge || challenge.days.length < dayInMonth) {
        return;
      }
      // Find index of day to update.
      const dayIndex = challenge.days.findIndex(day => day.dayInMonth === dayInMonth);
      challenge.days[dayIndex].status = status;
      this.saveToServer(challenge);
      this._currentChallenge.next(challenge);
    });
  }

  /**
   * Save a challenge to the firebase uri.
   *
   * @param challenge challenge to save.
   */
  private saveToServer(challenge: Challenge) {
    return this.http.put(`${this.firebaseRestUrl}/challenge.json`, challenge)
      .subscribe()
  }
}
