export const accumulateBillingDetails = (data) => {
    let totalBilling = {
      total: 0,
      remaining: 0,
      paid: 0
    };
  
    if (data && data.length > 0) {
      data.forEach((item) => {
        totalBilling.total += item?.subTotal || 0;
        totalBilling.remaining += item?.remaining || 0;
        totalBilling.paid += item?.paid || 0;
      });
    }
  
    return totalBilling;
  };
  export const mergeData = (data) => {
    if (data && data.length > 0) {
      // handle data
      const merged = new Map();
      data.forEach((item) => {
        const key = `${item && item.by && item.by.fullName ? item.by.fullName : 'N/A'}|${
          item && item.by && item.by.refer ? item.by.refer : 'N/A'
        }`;
        if (!merged.has(key)) {
          merged.set(key, {
            by: item?.by,
            visaBookingIds: item?.visaBookingIds ? [...item?.visaBookingIds] : [],
            billingDetail: {
              total: item?.subTotal,
              remaining: item?.remaining,
              paid: item?.paid
            },
            visaTicketBookingIds: item?.visaTicketBookingIds
              ? [...item?.visaTicketBookingIds]
              : []
          });
        } else {
          const currentItem = merged.get(key);
          if (item?.visaBookingIds) {
            currentItem.visaBookingIds.push(...item.visaBookingIds);
          }
          if (item?.visaTicketBookingIds) {
            currentItem.visaTicketBookingIds.push(...item.visaTicketBookingIds);
          }
        }
      });
      return Array.from(merged.values());
    }
  };