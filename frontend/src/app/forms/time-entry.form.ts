import * as _ from 'lodash';
import * as actions from '../state/actions';
import * as moment from 'moment';

import { ActionsSubject, Store, select } from '@ngrx/store';
import { BaseForm, FormCleanAfterMethod, IFormOptions } from './base.form';
import { FormControl, Validators } from '@angular/forms';
import { filter, take } from 'rxjs/operators';

import { AppState } from '../state/state';
import { IActionWithPayload } from './../state/models';
import { ITask } from './../state/reducers/task';
import { Observable } from '../../../node_modules/rxjs';
import { getTaskCollectionById } from '../state/selectors/task';

const options: IFormOptions = {
    alwaysEditable: true,
    cleanAfterMethod: FormCleanAfterMethod.loadSaved
}

export class TimeEntryForm extends BaseForm {

    controls: {
        id: FormControl
        task: FormControl
        started_at: FormControl
        started_at_time: FormControl
        ended_at: FormControl
        ended_at_time: FormControl
        comments: FormControl,
        signed_off: FormControl
    };
    updateAction = actions.TimeEntryActions.PATCH;
    updateSuccessAction = actions.TimeEntryActions.PATCH_SUCCESS;
    deleteAction = actions.TimeEntryActions.REMOVE;
    deleteSuccessAction = actions.TimeEntryActions.REMOVE_SUCCESS;

    task$: Observable<ITask>;

    constructor(
        protected store: Store<AppState>,
        protected actionsSubject: ActionsSubject,
        formOptions?: IFormOptions
    ) {
        super(
            store,
            actionsSubject,
            {
                id: new FormControl(null, Validators.required),
                task: new FormControl(null, Validators.required),
                started_at: new FormControl(null, Validators.required),
                started_at_time: new FormControl(null, Validators.required),
                ended_at: new FormControl(null, Validators.required),
                ended_at_time: new FormControl(null, Validators.required),
                comments: new FormControl(null),
                signed_off: new FormControl(false),
            },
            null,
            null,
            _.assign({}, options, formOptions)
        );
        
        // subscribe to the time changes and update the full date time fields
        this.controls.started_at_time.valueChanges.subscribe(
            value => {
                if (!value) { return };
                const timeSplit = value.split(':');
                const date = moment(this.controls.started_at.value).set({h: timeSplit[0], m: timeSplit[1]});
                this.controls.started_at.setValue(date.toISOString());
            }
        )
        this.controls.ended_at_time.valueChanges.subscribe(
            value => {
                if (!value) { return };
                const timeSplit = value.split(':');
                const date = moment(this.controls.ended_at.value).set({h: timeSplit[0], m: timeSplit[1]});
                this.controls.ended_at.setValue(date.toISOString());
            }
        )
        // reload the selected task data
        this.controls.task.valueChanges.subscribe(
            value => {
                this.task$ = this.store.pipe(select(getTaskCollectionById(value)));
            }
        )
    }

    load(data: any) {
        // set the initial data incase we need to reset it
        this.initialData = data;
        // patch the form as no all fields will be defined
        this.patchValue(data);
        // set the time fields values
        this.controls.started_at_time.setValue(moment(data.started_at).format('HH:mm'));
        this.controls.ended_at_time.setValue(moment(data.ended_at).format('HH:mm'));
        this.controls.signed_off.setValue(false);
        // load the selected task data
        this.task$ = this.store.pipe(select(getTaskCollectionById(data.task)));
    }

}
