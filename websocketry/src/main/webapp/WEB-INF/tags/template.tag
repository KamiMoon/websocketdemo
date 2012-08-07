<%@ include file="/WEB-INF/views/includes.jsp"%>

<%@ attribute name="title" required="true" type="java.lang.String"
	rtexprvalue="true"%>
<%@ attribute name="css" required="false" fragment="true"%>
<%@ attribute name="javascript" required="false" fragment="true"%>
<%@ attribute name="show" required="false" type="java.lang.Boolean"
	rtexprvalue="true"%>

<c:set var="title" value="${title}" scope="request" />
<c:set var="user" value="${pageContext.request.remoteUser}" />

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Demo App</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="js/libs/bootstrap/css/bootstrap.css" rel="stylesheet">
<link href="js/libs/bootstrap/css/bootstrap-responsive.css"
	rel="stylesheet">
<link href="css/basepage.css" rel="stylesheet">
<jsp:invoke fragment="css" />

<script src="js/libs/raphael/raphael-min.js"></script>
<script data-main="js/setup.js" src="js/libs/require/require.js"></script>
<jsp:invoke fragment="javascript" />
</head>
<body>
	<c:if test="${show != false}">
		<div class="navbar navbar-fixed-top">
			<div class="navbar-inner">
				<div class="container-fluid">
					<a class="btn btn-navbar" data-toggle="collapse"
						data-target=".nav-collapse"> <span class="icon-bar"></span> <span
						class="icon-bar"></span> <span class="icon-bar"></span>
					</a> <a class="brand" href="#">${title}</a>
					<div class="btn-group pull-right">
						<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
							<i class="icon-user"></i> <c:if test="${user != null}">
								${user}
							</c:if> <input id="userId" type="hidden" value="${user}" /> <span
							class="caret"></span>
						</a>
						<ul class="dropdown-menu">
							<c:choose>
								<c:when test="${user != null}">
									<li><a href="#">Profile</a></li>
									<li class="divider"></li>
									<li><a href="#">Logout</a></li>
								</c:when>
								<c:otherwise>
									<li><a href="#">Sign Out</a></li> {{else}}
								<li><a href="#">Login</a></li> {{/if}}
								</c:otherwise>
							</c:choose>
						</ul>
					</div>
					<div class="nav-collapse">
						<ul class="nav">
							<li class="active"><a href="#">Home</a></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</c:if>

	<div id="mainContent" class="container-fluid">
		<jsp:doBody />

		<c:if test="${show != false}">
			<div class="row-fluid">
				<hr>
				<p>&copy; Eric Kizaki 2012</p>
			</div>
		</c:if>
	</div>
</body>
</html>