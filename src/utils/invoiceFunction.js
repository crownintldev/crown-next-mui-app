export const mergeData = (data) => {
    if (data && data.length > 0) {
      const merged = new Map();
      data.forEach((item) => {
        const key = `${
          item && item.by && item.by.fullName ? item.by.fullName : "N/A"
        }|${item && item.by && item.by.refer ? item.by.refer : "N/A"}`;
        if (!merged.has(key)) {
          merged.set(key, {
            by: item.by,
            visaBookingIds: item.visaBookingIds ? [...item.visaBookingIds] : [],
            visaTicketBookingIds: item.visaTicketBookingIds
              ? [...item.visaTicketBookingIds]
              : [],
          });
        } else {
          const currentItem = merged.get(key);
          if (item.visaBookingIds) {
            currentItem.visaBookingIds.push(...item.visaBookingIds);
          }
          if (item.visaTicketBookingIds) {
            currentItem.visaTicketBookingIds.push(...item.visaTicketBookingIds);
          }
        }
      });
      return Array.from(merged.values());
    }
  };