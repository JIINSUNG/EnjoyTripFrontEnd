// Mock 데이터 정의

export const mockUsers = [
  {
    memberId: 'admin',
    memberName: '관리자',
    memberEmail: 'admin@enjoytrip.com',
    memberRole: 0,
    profileImage: 'https://i.pravatar.cc/150?img=1',
    createdAt: '2023-01-01'
  },
  {
    memberId: 'user1',
    memberName: '김여행',
    memberEmail: 'user1@enjoytrip.com',
    memberRole: 1,
    profileImage: 'https://i.pravatar.cc/150?img=2',
    createdAt: '2023-06-15'
  },
  {
    memberId: 'user2',
    memberName: '박관광',
    memberEmail: 'user2@enjoytrip.com',
    memberRole: 1,
    profileImage: 'https://i.pravatar.cc/150?img=3',
    createdAt: '2023-07-20'
  }
]

export const mockAttractions = [
  {
    contentId: 1,
    contentTypeId: 12,
    title: '남산서울타워',
    addr1: '서울특별시 용산구 남산공원길 105',
    zipcode: '04340',
    tel: '02-3455-9277',
    firstImage: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800',
    firstImage2: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=400',
    mapLevel: 6,
    latitude: 37.5512,
    longitude: 126.9882,
    sidoCode: 1,
    gugunCode: 1,
    readCount: 1500,
    likeCount: 230
  },
  {
    contentId: 2,
    contentTypeId: 12,
    title: '경복궁',
    addr1: '서울특별시 종로구 사직로 161',
    zipcode: '03045',
    tel: '02-3700-3900',
    firstImage: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
    firstImage2: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400',
    mapLevel: 6,
    latitude: 37.5796,
    longitude: 126.9770,
    sidoCode: 1,
    gugunCode: 1,
    readCount: 2300,
    likeCount: 450
  },
  {
    contentId: 3,
    contentTypeId: 12,
    title: '해운대해수욕장',
    addr1: '부산광역시 해운대구 우동',
    zipcode: '48094',
    tel: '051-749-5700',
    firstImage: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800',
    firstImage2: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400',
    mapLevel: 6,
    latitude: 35.1587,
    longitude: 129.1603,
    sidoCode: 6,
    gugunCode: 2,
    readCount: 3200,
    likeCount: 580
  },
  {
    contentId: 4,
    contentTypeId: 14,
    title: '제주 올레시장',
    addr1: '제주특별자치도 제주시 관덕로14길 20',
    zipcode: '63265',
    tel: '064-752-3001',
    firstImage: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    firstImage2: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    mapLevel: 6,
    latitude: 33.5131,
    longitude: 126.5217,
    sidoCode: 39,
    gugunCode: 1,
    readCount: 1800,
    likeCount: 320
  },
  {
    contentId: 5,
    contentTypeId: 12,
    title: '전주 한옥마을',
    addr1: '전라북도 전주시 완산구 기린대로 99',
    zipcode: '54999',
    tel: '063-282-1330',
    firstImage: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800',
    firstImage2: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=400',
    mapLevel: 6,
    latitude: 35.8154,
    longitude: 127.1530,
    sidoCode: 35,
    gugunCode: 1,
    readCount: 2700,
    likeCount: 490
  }
]

export const mockBoards = [
  {
    articleId: 1,
    memberId: 'user1',
    memberName: '김여행',
    articleTitle: '제주도 3박 4일 여행 후기',
    articleContent: '<p>제주도에서 정말 즐거운 시간을 보냈습니다. 날씨도 좋고 음식도 맛있었어요!</p><p>특히 성산일출봉에서 본 일출이 정말 아름다웠습니다.</p>',
    viewCount: 1245,
    likeCount: 89,
    categoryId: 2,
    registerTime: '2024-11-01',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    articleId: 2,
    memberId: 'user2',
    memberName: '박관광',
    articleTitle: '서울 당일치기 코스 추천',
    articleContent: '<p>서울에서 하루 만에 돌아볼 수 있는 코스를 추천합니다.</p><p>경복궁 → 인사동 → 남산타워 순서로 돌아보시면 좋아요!</p>',
    viewCount: 856,
    likeCount: 65,
    categoryId: 1,
    registerTime: '2024-11-03',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  },
  {
    articleId: 3,
    memberId: 'admin',
    memberName: '관리자',
    articleTitle: '[공지] 겨울 여행 추천 명소',
    articleContent: '<p>겨울 여행을 계획하시는 분들을 위한 추천 명소를 소개합니다.</p><p>강원도 스키장과 온천을 함께 즐기세요!</p>',
    viewCount: 2340,
    likeCount: 156,
    categoryId: 0,
    registerTime: '2024-11-05',
    profileImage: 'https://i.pravatar.cc/150?img=1'
  },
  {
    articleId: 4,
    memberId: 'user1',
    memberName: '김여행',
    articleTitle: '부산 맛집 투어',
    articleContent: '<p>부산에서 꼭 가봐야 할 맛집들을 정리했습니다.</p><p>해운대 회센터와 광안리 카페거리를 추천드립니다!</p>',
    viewCount: 1567,
    likeCount: 112,
    categoryId: 3,
    registerTime: '2024-11-07',
    profileImage: 'https://i.pravatar.cc/150?img=2'
  },
  {
    articleId: 5,
    memberId: 'user2',
    memberName: '박관광',
    articleTitle: '경주 역사 탐방 코스',
    articleContent: '<p>경주에서 역사를 느낄 수 있는 코스를 소개합니다.</p><p>불국사, 석굴암, 첨성대를 하루에 돌아볼 수 있어요.</p>',
    viewCount: 934,
    likeCount: 78,
    categoryId: 2,
    registerTime: '2024-11-09',
    profileImage: 'https://i.pravatar.cc/150?img=3'
  }
]

export const mockComments = [
  {
    commentId: 1,
    articleId: 1,
    memberId: 'user2',
    memberName: '박관광',
    content: '제주도 정말 가보고 싶네요! 좋은 정보 감사합니다.',
    registerTime: '2024-11-02',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    parentCommentId: null
  },
  {
    commentId: 2,
    articleId: 1,
    memberId: 'admin',
    memberName: '관리자',
    content: '좋은 후기 감사드립니다. 다른 분들에게도 도움이 될 것 같네요!',
    registerTime: '2024-11-02',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    parentCommentId: null
  },
  {
    commentId: 3,
    articleId: 2,
    memberId: 'user1',
    memberName: '김여행',
    content: '서울 당일치기 코스 참고하겠습니다!',
    registerTime: '2024-11-04',
    profileImage: 'https://i.pravatar.cc/150?img=2',
    parentCommentId: null
  },
  {
    commentId: 4,
    articleId: 1,
    memberId: 'user1',
    memberName: '김여행',
    content: '저도 다음달에 제주도 가는데 이 정보 정말 유용하네요!',
    registerTime: '2024-11-03',
    profileImage: 'https://i.pravatar.cc/150?img=2',
    parentCommentId: 1
  },
  {
    commentId: 5,
    articleId: 2,
    memberId: 'user2',
    memberName: '박관광',
    content: '남산타워에서 야경 보는 것도 추천합니다!',
    registerTime: '2024-11-05',
    profileImage: 'https://i.pravatar.cc/150?img=3',
    parentCommentId: null
  },
  {
    commentId: 6,
    articleId: 3,
    memberId: 'admin',
    memberName: '관리자',
    content: '부산 해운대는 여름이 최고죠!',
    registerTime: '2024-11-06',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    parentCommentId: null
  }
]

export const mockPlans = [
  {
    planId: 1,
    memberId: 'user1',
    memberName: '김여행',
    title: '제주도 가족 여행',
    startDate: '2024-12-01',
    endDate: '2024-12-04',
    description: '가족들과 함께하는 제주도 여행',
    createdAt: '2024-11-01'
  },
  {
    planId: 2,
    memberId: 'user2',
    memberName: '박관광',
    title: '서울 친구들과 여행',
    startDate: '2024-11-20',
    endDate: '2024-11-21',
    description: '친구들과 서울 명소 투어',
    createdAt: '2024-11-03'
  },
  {
    planId: 3,
    memberId: 'user1',
    memberName: '김여행',
    title: '부산 해변 여행',
    startDate: '2024-12-15',
    endDate: '2024-12-17',
    description: '부산 해운대와 광안리 탐방',
    createdAt: '2024-11-05'
  }
]

export const mockPlanDetails = [
  {
    planDetailId: 1,
    planId: 1,
    contentId: 4,
    day: 1,
    order: 1,
    attraction: mockAttractions[3]
  },
  {
    planDetailId: 2,
    planId: 1,
    contentId: 5,
    day: 1,
    order: 2,
    attraction: mockAttractions[4]
  },
  {
    planDetailId: 3,
    planId: 2,
    contentId: 1,
    day: 1,
    order: 1,
    attraction: mockAttractions[0]
  },
  {
    planDetailId: 4,
    planId: 2,
    contentId: 2,
    day: 1,
    order: 2,
    attraction: mockAttractions[1]
  }
]

export const mockGallery = [
  {
    galContentId: 1,
    galTitle: '남산타워 야경',
    galWebImageUrl: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800',
    galPhotographer: 'EnjoyTrip',
    galCreatedtime: '2024-01-15',
    galContentTypeId: 12
  },
  {
    galContentId: 2,
    galTitle: '경복궁 봄 풍경',
    galWebImageUrl: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
    galPhotographer: 'EnjoyTrip',
    galCreatedtime: '2024-03-20',
    galContentTypeId: 12
  },
  {
    galContentId: 3,
    galTitle: '해운대 해변',
    galWebImageUrl: 'https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800',
    galPhotographer: 'EnjoyTrip',
    galCreatedtime: '2024-07-10',
    galContentTypeId: 14
  },
  {
    galContentId: 4,
    galTitle: '제주 올레시장',
    galWebImageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    galPhotographer: 'EnjoyTrip',
    galCreatedtime: '2024-08-05',
    galContentTypeId: 14
  }
]

export const mockWeather = [
  {
    baseDate: '20241112',
    baseTime: '0500',
    category: 'TMP',
    fcstDate: '20241112',
    fcstTime: '0600',
    fcstValue: '10',
    nx: 60,
    ny: 127
  },
  {
    baseDate: '20241112',
    baseTime: '0500',
    category: 'SKY',
    fcstDate: '20241112',
    fcstTime: '0600',
    fcstValue: '1',
    nx: 60,
    ny: 127
  }
]

export const mockEStations = [
  {
    statId: 1,
    statNm: '서울시청 전기차 충전소',
    addr: '서울특별시 중구 세종대로 110',
    lat: 37.5663,
    lng: 126.9779,
    useTime: '24시간',
    chargeTp: '완속',
    stat: '사용가능'
  },
  {
    statId: 2,
    statNm: '강남역 전기차 충전소',
    addr: '서울특별시 강남구 강남대로 396',
    lat: 37.4979,
    lng: 127.0276,
    useTime: '24시간',
    chargeTp: '급속',
    stat: '사용가능'
  },
  {
    statId: 3,
    statNm: '해운대 전기차 충전소',
    addr: '부산광역시 해운대구 중동',
    lat: 35.1587,
    lng: 129.1603,
    useTime: '06:00~22:00',
    chargeTp: '완속',
    stat: '충전중'
  }
]

export const mockSidos = [
  { sidoCode: 1, sidoName: '서울' },
  { sidoCode: 6, sidoName: '부산' },
  { sidoCode: 35, sidoName: '전북' },
  { sidoCode: 39, sidoName: '제주' }
]

export const mockGuguns = [
  { sidoCode: 1, gugunCode: 1, gugunName: '강남구' },
  { sidoCode: 1, gugunCode: 2, gugunName: '강동구' },
  { sidoCode: 1, gugunCode: 3, gugunName: '강북구' },
  { sidoCode: 6, gugunCode: 1, gugunName: '강서구' },
  { sidoCode: 6, gugunCode: 2, gugunName: '해운대구' }
]
