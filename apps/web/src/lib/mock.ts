export type Corridor = {
  id: "uk-ng";
  from: { country: "United Kingdom"; currency: "GBP"; symbol: "£" };
  to: { country: "Nigeria"; currency: "NGN"; symbol: "₦" };
};

export type Beneficiary = {
  id: string;
  fullName: string;
  bankName: string;
  accountNumberMasked: string;
  country: "Nigeria";
};

export type TransferStatus =
  | "created"
  | "paid"
  | "settling"
  | "paid_out"
  | "failed";

export type Transfer = {
  id: string;
  createdAt: string;
  corridorId: Corridor["id"];
  sendAmount: { amount: number; currency: "GBP" };
  payoutAmount: { amount: number; currency: "NGN" };
  fee: { amount: number; currency: "GBP" };
  rate: number;
  beneficiary: Beneficiary;
  status: TransferStatus;
};

export const corridor: Corridor = {
  id: "uk-ng",
  from: { country: "United Kingdom", currency: "GBP", symbol: "£" },
  to: { country: "Nigeria", currency: "NGN", symbol: "₦" },
};

export const beneficiaries: Beneficiary[] = [
  {
    id: "b_001",
    fullName: "Adaeze Okafor",
    bankName: "GTBank",
    accountNumberMasked: "**** 2241",
    country: "Nigeria",
  },
  {
    id: "b_002",
    fullName: "Ibrahim Sani",
    bankName: "Access Bank",
    accountNumberMasked: "**** 9083",
    country: "Nigeria",
  },
  {
    id: "b_003",
    fullName: "Wanjiku Njeri",
    bankName: "Kuda",
    accountNumberMasked: "**** 1170",
    country: "Nigeria",
  },
];

export const transfers: Transfer[] = [
  {
    id: "t_nv_8f2a1",
    createdAt: "2026-05-19T10:22:00Z",
    corridorId: "uk-ng",
    sendAmount: { amount: 250, currency: "GBP" },
    payoutAmount: { amount: 457000, currency: "NGN" },
    fee: { amount: 2.99, currency: "GBP" },
    rate: 1850,
    beneficiary: beneficiaries[0]!,
    status: "paid_out",
  },
  {
    id: "t_nv_1c91b",
    createdAt: "2026-05-18T19:11:00Z",
    corridorId: "uk-ng",
    sendAmount: { amount: 80, currency: "GBP" },
    payoutAmount: { amount: 146800, currency: "NGN" },
    fee: { amount: 1.5, currency: "GBP" },
    rate: 1850,
    beneficiary: beneficiaries[1]!,
    status: "settling",
  },
  {
    id: "t_nv_c3aa0",
    createdAt: "2026-05-17T13:03:00Z",
    corridorId: "uk-ng",
    sendAmount: { amount: 35, currency: "GBP" },
    payoutAmount: { amount: 64200, currency: "NGN" },
    fee: { amount: 1.0, currency: "GBP" },
    rate: 1850,
    beneficiary: beneficiaries[2]!,
    status: "failed",
  },
];

