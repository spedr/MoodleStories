var width = 600,
    height = 475;

var rect_x = 100;
var rect_y =  75;

var dl_id = 0
var delId = 0

var deltaX_rect, deltaY_rect, deltaX_text, deltaY_text;
var selected, removalTarget;

var nodeData = []

//name, nodeType

var svg = d3.select("#pai").append("svg")
    .attr("width", width)
    .attr("height", height)


var drag = d3.drag();
  drag.on("drag", function(event) {
      d3.select(this).attr("cx", +d3.select(this).attr("cx") + event.dx);
      d3.select(this).attr("cy", +d3.select(this).attr("cy") + event.dy);
  })


function updateData(){

var dl_id = delete_id();
var node = svg
    .append('g')
    .append('circle')
    .attr("id", dl_id)
    .attr('r', '40')
    .attr('cx', '150')
    .attr('cy', '50')
    .attr('fill', '#ccc')
    .attr('stroke', 'black')
    .attr('transform', 'translate(0,0)')
    .call(drag)
    .on("click", select);

var nData = {nodeType:"Initial", nodeid: dl_id, name: dl_id, image:"none"};
  nodeData.push(nData)
}

function delete_id(){
	delId+=1;
  return "nodeId_" + delId.toString();
}

function select(d) {
  var current_before = findData()
	if(selected != null){
    if(current_before.nodeType=="Initial"){
  	  selected.classed("slcted", false)
    } else if (current_before.nodeType=="Success"){
      selected.classed("success_selected", false)
      selected.classed("success", true)
    } else if (current_before.nodeType=="Average"){
      selected.classed("average_selected", false)
      selected.classed("average", true)
    } else if (current_before.nodeType=="Failure"){
      selected.classed("failure_selected", false)
      selected.classed("failure", true)
    }

  }
  removalTarget = d3.select(this).attr("id");
  var current = findData()
	selected = d3.select(this)
  //console.log(d3.select(this))
  if (current.nodeType == "Initial"){
    selected.transition()
      .duration(500)
      .attr("class", "slcted")
  } else if (current.nodeType == "Success"){
    selected.transition()
      .duration(500)
      .attr("class", "success_selected")
  } else if (current.nodeType == "Average"){
    selected.transition()
      .duration(500)
      .attr("class", "average_selected")
  } else if (current.nodeType == "Failure"){
    selected.transition()
      .duration(500)
      .attr("class", "failure_selected")
  }

  var selected_text = '<p id="selectP">Selected node: ' + current.name;

  document.getElementById('form').innerHTML = selected_text;

    var populate_form = `
<div class="field-container">
<input class="field-input" id="inputid" name="inputName" type="text" placeholder=" ">
<label class="field-placeholder" for="inputName">Name</label>
</div>
<div class="submit_container" id="submit_container">
<button type="button" class="btn btn-green btn-border"  onclick="submitFormData()">Submit</button>
</div>
<div class="file-upload">
<div class="image-upload-wrap">
  <input class="file-upload-input" type='file' onchange="readURL(this);" accept="image/*" />
  <div class="drag-text">
    <h3>Drag and drop a file or select add Image</h3>
  </div>
</div>
<div class="file-upload-content">
  <img class="file-upload-image" src="#" alt="your image" />
  <div class="image-title-wrap">
    <button type="button" onclick="removeUpload()" class="btn btn-red btn-border">Remove <span class="image-title">Uploaded Image</span></button>
  </div>
</div>
<label for="ntype">Page type:</label>
    <select name="nodetype" id="ntype">
    <option value="Initial">Initial</option>
    <option value="Success">Success</option>
    <option value="Average">Average</option>
    <option value="Failure">Failure</option>
  </select>
`;

  if (current.image != "none"){
    console.log(current);
    readURL2(current.image);
  }

  document.getElementById('form').innerHTML += populate_form;
}

function deleteRect(){
	d3.select("#" + removalTarget).remove();
	//removalTarget.target.remove();
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.files[0].name);
    };
    var current = findData();
    current.image = input.files[0];
    console.log(input.files[0]);
    reader.readAsDataURL(input.files[0]);

  } else {
    removeUpload();
  }
}

function readURL2(input){
    var reader = new FileReader();

    reader.onload = function(e) {
      $('.image-upload-wrap').hide();

      $('.file-upload-image').attr('src', e.target.result);
      $('.file-upload-content').show();

      $('.image-title').html(input.name);
    };
    var current = findData();
    current.image = input;
    reader.readAsDataURL(input);
}

function findData(){
  //nop
  var current = nodeData.find(x => x.nodeid === removalTarget);
  return current;
}

function submitFormData(){
  var current = findData()
  var name = document.getElementById('inputid').value;
  var type = document.getElementById('ntype').value;
  current.name = name;
  current.nodeType = type;

  document.getElementById('selectP').innerHTML = 'Selected node: ' + name;

  if (type=="Success"){
    selected.transition()
      .duration(500)
      .attr("class", "success_selected")
  } else if (type == "Average"){
    selected.transition()
      .duration(500)
      .attr("class", "average_selected")
  } else if (type == "Failure"){
    selected.transition()
      .duration(500)
      .attr("class", "failure_selected")
  }
}

function removeUpload() {
  var current = findData();
  current.image = "none";
  $('.file-upload-input').replaceWith($('.file-upload-input').clone());
  $('.file-upload-content').hide();
  $('.image-upload-wrap').show();
}
$('.image-upload-wrap').bind('dragover', function () {
		$('.image-upload-wrap').addClass('image-dropping');
	});
	$('.image-upload-wrap').bind('dragleave', function () {
		$('.image-upload-wrap').removeClass('image-dropping');
});
