/**
 * A contact group.
 */
export interface ContactGroup {
  resourceName?: string;
  etag?: string;
  metadata?: ContactGroupMetadata;
  groupType?: GroupType;
  name: string;
  formattedName?: string;
  memberResourceNames?: [string];
  memberCount?: number;
  clientData?: GroupClientData[];
}

/**
 * The metadata about a contact group.
 */
interface ContactGroupMetadata {
  updateTime: string;
  deleted?: boolean;
}

/**
 * Arbitrary client data that is populated by clients. Duplicate keys and values are allowed.
 */
interface GroupClientData {
  key: string;
  value: string;
}

/**
 * A contact group type.
 */
type GroupType = 'GROUP_TYPE_UNSPECIFIED' | 'USER_CONTACT_GROUP' | 'SYSTEM_CONTACT_GROUP';
