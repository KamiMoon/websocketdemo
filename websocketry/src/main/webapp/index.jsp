<%@ include file="/WEB-INF/views/includes.jsp"%>

<%-- See WEB-INF/tags/templage.tag for the base page --%>
<e:template title="Demo">
	<div id="chatrow" class="row-fluid">
		<div class="span12">
			<form id="chatForm" class="form-inline">
				<label>Chat:</label> <input id="chatText" type="text" name="chat"
					value="" size="15" maxlength="15" />
				<button type="submit" class="btn">Submit</button>
			</form>
		</div>
	</div>

	<div class="row-fluid">
		<div class="span12">
			<div id="canvas"></div>
		</div>
	</div>
</e:template>