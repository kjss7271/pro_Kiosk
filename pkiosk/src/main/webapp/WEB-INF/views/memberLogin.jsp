<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>로그인</title>
	</head>
	<body>
	<c:if test="${session_flag == 'success'}">
		<script type="text/javascript">
			alert("로그인 성공");
			location.href="kiosk_login";
		</script>
	</c:if>
	<c:if test="${session_flag != 'success'}">
		<script type="text/javascript">
			alert("로그인 실패");
			location.href="kiosk_main";
		</script>
	</c:if>
	</body>
</html>