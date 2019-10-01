import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Challenge } from './challenge.model';
import { DayStatus } from './day.model';
import { take } from 'rxjs/operators';

/**
 * @author Alessandro Alberga
 * @description challenges service for app state on challenges.
 */
@Injectable({
  providedIn: 'root'
})
export class ChallengesService {

  /**
   * Current challenge subscribable behaviour subject.
   */
  private _currentChallenge = new BehaviorSubject<Challenge>(null);

  constructor() { }

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
    this._currentChallenge.next(challenge);
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
      this._currentChallenge.next(challenge);
    });
  }
}
