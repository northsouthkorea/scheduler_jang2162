import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {combineEpics, createEpicMiddleware, ofType} from 'redux-observable';
import {BehaviorSubject} from 'rxjs';
import {mergeMap, takeUntil} from 'rxjs/operators';
import schedulerPage, {SchedulerPageEpics, SchedulerPageState} from './modules/SchedularPageModule';
import test, {TestEpics, TestState} from './modules/TestModule';

export interface RootState {
    test: TestState;
    schedulerPage: SchedulerPageState;
}

const rootReducer = combineReducers<RootState>({
    test,
    schedulerPage
});

const epicMiddleware = createEpicMiddleware();
const rootEpic = combineEpics<any>(
    ...TestEpics,
    ...SchedulerPageEpics
);

const middleware: any[] = [];
if (process.env.NODE_ENV === 'production') {
    middleware.push(applyMiddleware(epicMiddleware));
} else {
    middleware.push(composeWithDevTools(applyMiddleware(epicMiddleware)));
}

export const store = createStore(rootReducer, compose(...middleware));

const epic$ = new BehaviorSubject(rootEpic);
const hotReloadingEpic: any = (action$: any, ...rest: any) =>
    epic$.pipe(
        mergeMap(epic =>
            epic(action$, ...rest).pipe(
                takeUntil(action$.pipe(
                    ofType('EPIC_END')
                ))
            )
        )
    );
epicMiddleware.run(hotReloadingEpic);
if (module.hot) {
    module.hot.accept('./', () => {
        store.dispatch({type: 'EPIC_END'});
        epic$.next(rootEpic);
    });
}
