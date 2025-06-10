export interface InventoryItem {
  id: string;
  name: string;
  description?: string;
  tags: string[];
  photos: string[];
  category: string;
  estimatedValue?: number;
  dateAdded: Date;
  status: 'owned' | 'listed' | 'donated' | 'distributed';
  marketplaceLinks?: MarketplaceLink[];
  donationInfo?: DonationInfo;
  distributionInfo?: DistributionInfo;
  expiryReminder?: ExpiryReminder;
}

export interface ExpiryReminder {
  type: 'never' | 'fixed' | 'recurring';
  interval?: '1month' | '3months' | '6months' | '9months' | '12months';
  recurringType?: 'halfyearly' | 'annually';
  endDate?: Date;
  customDate?: Date;
  lastNotified?: Date;
}

export interface MarketplaceLink {
  id: string;
  platform: 'facebook' | 'craigslist' | 'ebay' | 'auction';
  url: string;
  price?: number;
  datePosted: Date;
}

export interface DonationInfo {
  charity: string;
  dateDonated?: Date;
  taxDeductible: boolean;
}

export interface DistributionInfo {
  recipient: string;
  event: string;
  scheduledDate?: Date;
  notes?: string;
}