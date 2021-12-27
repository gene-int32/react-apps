import {ContactGroup} from '../../types/google';

interface IAcceptor<T> {
  accept(visitor: T): void;
}

/**
 * People API.
 * Provides access to information about profiles and contacts.
 */
class PeopleService {
  private static instance: PeopleService;

  private readonly baseUrl = 'https://people.googleapis.com/v1';

  constructor(public readonly contactGroups: ContactGroups) {
    if (!PeopleService.instance) {
      PeopleService.instance = this;

      contactGroups.accept(this);
    }
    return PeopleService.instance;
  }

  path(paths: string | string[]): string {
    if (!Array.isArray(paths)) {
      return this.path([paths]);
    }
    return `${[this.baseUrl, ...paths].join('/')}`;
  }
}

/**
 * REST Resource: contactGroups.
 */
class ContactGroups implements IAcceptor<PeopleService> {
  private peopleService!: PeopleService;

  accept(visitor: PeopleService): void {
    this.peopleService = visitor;
  }

  /**
   * Get a list of contact groups owned by the authenticated user by specifying a list of contact group resource names.
   */
  batchGet(params: {
    resourceNames: string[];
    maxMembers?: number;
    groupFields?: ContactGroupFields[];
  }): Promise<ContactGroup[]> {
    return gapi.client
      .request({
        path: this.peopleService.path('contactGroups:batchGet'),
        params,
      })
      .then(({result}) => result);
  }

  /**
   * Create a new contact group owned by the authenticated user.
   */
  create(body: {contactGroup: ContactGroup; readGroupFields?: ContactGroupFields[]}): Promise<ContactGroup> {
    return gapi.client
      .request({
        path: this.peopleService.path('contactGroups'),
        method: 'POST',
        body: {
          ...body,
          readGroupFields: body.readGroupFields?.join(','),
        },
      })
      .then(({result}) => result);
  }

  /**
   * Delete an existing contact group owned by the authenticated user by specifying a contact group resource name.
   */
  delete(resourceName: string, params: {deleteContacts?: boolean} = {}): Promise<void> {
    return gapi.client
      .request({
        path: this.peopleService.path(resourceName),
        method: 'DELETE',
        params,
      })
      .then(({result}) => result);
  }

  /**
   * Get a specific contact group owned by the authenticated user by specifying a contact group resource name.
   */
  get(
    resourceName: string,
    params: {maxMembers?: number; groupFields?: ContactGroupFields[]} = {}
  ): Promise<ContactGroup> {
    return gapi.client
      .request({
        path: this.peopleService.path(resourceName),
        params,
      })
      .then(({result}) => result);
  }

  /**
   * List all contact groups owned by the authenticated user.
   */
  list(
    params: {
      pageToken?: string;
      pageSize?: number;
      syncToken?: string;
      groupFields?: ContactGroupFields[];
    } = {}
  ): Promise<{
    contactGroups: ContactGroup[];
    nextPageToken?: string;
    nextSyncToken?: string;
    totalItems: number;
  }> {
    return gapi.client
      .request({
        path: this.peopleService.path('contactGroups'),
        params: {
          ...params,
          groupFields: params.groupFields?.join(','),
        },
      })
      .then(({result}) => result);
  }

  /**
   * Update the name of an existing contact group owned by the authenticated user.
   */
  update(
    resourceName: string,
    body: {
      contactGroup: ContactGroup;
      updateGroupFields?: Extract<ContactGroupFields, 'clientData' | 'name'>[];
      readGroupFields?: ContactGroupFields[];
    }
  ): Promise<ContactGroup> {
    return gapi.client
      .request({
        path: this.peopleService.path(resourceName),
        method: 'PUT',
        body: {
          ...body,
          updateGroupFields: body.updateGroupFields?.join(','),
          readGroupFields: body.readGroupFields?.join(','),
        },
      })
      .then(({result}) => result);
  }
}

type ContactGroupFields = 'clientData' | 'groupType' | 'memberCount' | 'metadata' | 'name';

export default new PeopleService(new ContactGroups());
