---
title: When should I refresh RefreshToken
date: "2020-12-15T23:00:00.169Z"
description: This is about timing to renew refreshToken
---

## When should I refresh RefreshToken?

-주의! 이 글은 정보글이 아니라 저도 잘 몰라서 생각 정리겸 쓰고 있습니다..

Authorization Server(인증 서버)를 통해 end-user가 Resoucre Api에 접근할 수 있는 access token을 얻는 flow 에는 여러가지가 있다. 만약 Client Credential이 보장된다면 Authorization Code Flow로 하면 될 것이고, Client가 SPA(Single Page Application)이라면 Client Sercret을 가지고 있을 수 없으니까 Authorization Code Flow with PKCE를 통해 "Authorization Server에 첫 요청을 보냈던 클라이언트와 Authrization code로 access token을 요청하는 클라이언트가 동일하다"는 것을 보이면 될 것이다. 이런식으로 클라이언트의 동일성을 확인하면 악의적인 사용자가 중간에 redirect url을 변조해서 다른 유저의 access token을 얻는 것을 막을 수 있다. 사실 Authorization Server가 Client Id에 해당하는 redirect url 정보를 가지고 있다면 redirect url이 변조됐는지 아닌지를 검사할 수 있다. 즉 Authorization code를 Authorization Server에서 제공받고 이를 다시보내서 access token을 가져오는게 과정을 생략해도 redirect_url 검사만 제대로 하면 access token이 엉뚱한 사람에게 가는 것을 막을 수 있다. 이렇게 Authorization code를 생략하는 흐름을 Implicit flow라 한다. 그래도.. 될 수 있으면 Authorization Code Flow with PKCE를 권장하는 것 같다.

access token을 얻으면 대부분은 브라우저 내에 저장해서 Resoucre Api에 요청할 때 Authorization Server을 거치지 않고 직접 access token을 헤더에 넣어서 보낸다. access token만 있으면 Resoucre Api에 접근해서 원하는 정보를 얻거나, 또는 엔드 유저의 resource를 수정할 수 있다. 또한 access token은 자주 통신에 사용되는 데이터이다.(매 api 요청마다 헤더에 access token 표기) 즉 access token은 빈번하게 통신하는 데이터인 만큼, 그리고 end user의 resource를 가져오거나 수정할 수 있는 key인 만큼 access token 탈취에 대해서 대처할 방법이 필요하다. 가장 보편적인 것은 acces token에 expiration time을 짧게 주는 것이다. 약 30분이나 한 시간 정도?? 그런데 시간을 이렇게 짧게 잡으면 사용자는 30분마다 re-authenticated 되어야 하는데, 즉 로그인을 다시해야 하는 상황이 발생한다. 어떤 사용자가 매 30분마다 로그인 하고 싶어할까..
그래서 나온게 refresh token이다.

refresh token은 오로지 Authorization에 access_token을 다시 요청할 때 쓰인다. refresh token의 expiration time은 access token 보다는 길게해서 한 30일쯤?? 으로 설정하는 것 같다. 따라서 이 refresh token이 만료되지 않는 한 클라이언트는 access token이 만료될 때마다 refresh token으로 조용히 access token을 새로 발급받을 수 있다.(사용자는 더이상 로그인을 안해도 된다!) refresh token는 access token이 만료될때만 Authorization Server에 전송하므로 access token 보다는 통신 빈도가 적어 탈취 가능성도 access token보다 낮다고 할 수 있다. (사실 이 부분은 잘 몰라서 좀 더 찾아보고 후에 수정하도록 하겠습니다. 2020-12-16 ) 

refresh token은 access token을 얻는데에 쓰이기 때문에 access token만큼 중요하다. 따라서 탈취에 대처하기 위해 wep App이라면 Server-Side 쪽에서 관리하면 된다.(Refresh token을 DB에 넣는다든가) 그런데 클라이언트가 SPA라면 refresh token은 브라우저 내 storage에 보관할 수 밖에 없다. 따라서 안전을 위해 refresh token을 적절한 순간에 갱신해줘야 한다. 그렇다면 refresh token은 언제 갱신해야 할까? 즉 refresh token은 언제 refresh 하는게 좋을까?

#### SPA에서의 refresh token
refresh token을 단순히 만료되는 순간에만 갱신한다면 어떠한 일이 생길지 생각해봤다. 사용자가 로그인을 성공하면 기한 30일짜리 refresh token을 받아 브라우저내에 저장시킨다. refresh token이 존재하는 한 사용자는 브라우저를 껐다 켜도 로그인 상태를 유지하도록 클라이언트를 구성할 수 있을 것이다. 사용자는 매번 클라이언트를 통해 resoucre api에 요청을 보내고 access token이 만료되면 Authorization Server에서 다시 발급받을 것이다. 만약 refresh token이 만료된다면 클라이언트는 사용자를 로그인 페이지로 이동시킬 것이다.

그러면 refresh token의 만료 기한이 5분 남았을 때 사용자는 어떤 경험을 할 수 있을까? 물론 refresh token의 만료 기한이 5분이어도 access token은 새로 발급받을 수 있고, access token의 만료기한은 30분 정도 일테니까 최대 30분간은 지속적으로 resoucre api와 통신할 수 있다. 그러다 access token가 만료되면 refresh token을 Authorization Server에 보낼 것이고 refresh token이 만료되었다는 응답을 받을 것이다. 그러면 클라이언트는 사용자를 로그인 페이지로 이동시키고 사용자는 다시 로그인을 해야 refresh token을 받을 수 있을 것이다. 뭔가 이상하지 않은가? 사용자에 입장에서는 방금까지 잘 접속했던 사이트에서 갑자기 로그아웃 되고 다시 로그인하라는 통보를 받은 셈이다. 만약 중요한 정보를 수정하고 있었다면 위와 같은 상황은 정말 난감할 수 밖에 없다. 

이같은 문제를 해결하려면 refresh token을 갱신하는 타이밍을 로그인 할 때 뿐만 아니라 api에 요청을 보낼때에도 일어나야 한다고 생각한다. 아래는 stack over flow의 힘을 빌려 OAuth 2.0에서 규정하는 refresh token 갱신 타이밍이다.

#### section 10.4(of the OAuth 2.0 specification) 
#### Security Considerations for refresh_token states:

	The authorization server MUST verify the binding between the refresh token 
	and client identity whenever the client identity can be authenticated. 
	When client authentication is not possible, the authorization server SHOULD 
	deploy other means to detect refresh token abuse.

	For example, the authorization server could employ refresh token
	rotation in which a new refresh token is issued with every access
	token refresh response. The previous refresh token is invalidated 
	but retained by the authorization server. If a refresh token is
	compromised and subsequently used by both the attacker and the
	legitimate client, one of them will present an invalidated refresh
	token, which will inform the authorization server of the breach.

위 글을 보면, client identity 즉 client credential이 보장된다면 refresh token의 만료기한은 필요없어 보인다.(refresh 토큰이 탈취 되어도 Authorization Server에는 인증된 클라이언트가 아니면 access token을 제공하지 않을 것이기 때문) 그러나 SPA는 그렇지 못하므로 refresh token rotation 즉 매번 access token을 갱신할 때마다 refresh token도 갱신해야 한다고 설명하고 있다. refresh token rotation 전략을 사용하면 사용자가 갑자기 로그아웃되는 사태를 막을 수 있을 뿐만 아니라 만약 공격자가 refresh token을 탈취해도 본 주인이 access token 발급요청을 보내는 순간 refresh token이 갱신될 것이므로 좀 더 보안성을 높일 수 있다.(공격자가 본 주인보다 먼저 access token 발급요청을 보낸다면, 본 주인이 가지고 있는 refresh token은 더 이상 access token을 발급받는데 쓰지 못할 것이고 따라서 본 주인이 access token을 요청하는 순간 Authorization Server에서 잘못된 refresh token이라는 응답을 줄 것이다.클라이언트는 해당 응답을 받고 본 주인을 로그인 페이지로 이동시키고 본 주인이 로그인을 다시하는 순간 공격자가 탈취한 refresh token은 무용지물이 된다.)

그럼 다중 로그인은 어떻게 하냐고 ㅋㅋ 아 글 막썻네..