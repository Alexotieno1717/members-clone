export interface Transactions {
    transactions?: (TransactionsEntity)[] | null;
}
export interface TransactionsEntity {
    reference: string;
    amount: string;
    credits: string;
    client: string;
    payment_mode: string;
    description?: string | null;
    transaction_date: string;
}

export interface Members {
  members?: MembersEntity[] | null;
}
export interface MembersEntity {
  id: string;
  id_number: string;
  surname: string;
  id_serial_no: string;
  other_name: string;
  gender: string;
  first_name: string;
  dob: string;
  valid: string;
  County: string;
  security_firm_name: string;
  tel_no?: string | null;
  firm_id: string;
  inserted_at: string;
  updated_at: string;
}
