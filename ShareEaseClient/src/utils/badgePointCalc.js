import axios from 'axios';

export const getUserPoint = async id => {
  const userDetails = [];
  const res = await axios.get(`http://localhost:5109/api/User`);
  if (res.status === 200) {
    const { data } = res;
    data.forEach(user => {
      const userPoints = {};
      userPoints.user = user;
      userPoints.points = 0;
      userDetails.push(userPoints);
    });
    const resourceRes = await axios.get(`http://localhost:5109/api/Resource`);
    if (resourceRes.status === 200) {
      const { data } = resourceRes;
      data.forEach(item => {
        const userIndex = userDetails.findIndex(
          user => user.user.user_id === item.userId
        );
        if (userIndex !== -1) {
          userDetails[userIndex].points += 5;
        }
      });
    }
  }
  return userDetails;
};
export const getContributions = async id => {
  const res = await axios.get(`http://localhost:5109/api/Request`);
  if (res.status === 200) {
    const { data } = res;
    const approvedRequests = data.filter(
      request => request.ownerId === id && request.status === 'approved'
    );
    const numApprovedRequests = approvedRequests.length;
    const receivedRequests = data.filter(request => request.ownerId === id);
    const numReceivedRequests = receivedRequests.length;
    return { numApprovedRequests, numReceivedRequests };
  }
};
