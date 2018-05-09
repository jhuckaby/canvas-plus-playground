// DragSort v1.0
// Author: Joseph Huckaby
// (c) 2017, License: MIT

var DragSort = {
	
	dragging: false,
	
	attach: function(cont_sel, elem_sel, callback) {
		var $cont = $(cont_sel);
		var $collection = $cont.find(elem_sel);
		var $cur = null;
		
		// make all items draggable
		// $collection.attr('draggable', 'true');
		
		// assign all unique identifiers
		$collection.each( function(idx) {
			$(this).data({ 
				'drag_parent': cont_sel,
				'drag_idx': idx 
			});
		});
		
		$collection.on('dragstart', function(event) {
			var e = event.originalEvent;
			/*e.dataTransfer.effectAllowed = "all";
			e.dataTransfer.setData( 'text/plain', '' );
			e.dataTransfer.dropEffect = 'move';*/
			$cur = $(e.target);
			DragSort.dragging = true;
			// console.log("dragstart");
		});
		
		$collection.on('dragover', function(event) {
			// inform browser we are a drop target
			var e = event.originalEvent;
			e.dataTransfer.dropEffect = 'all';
			e.preventDefault();
			e.stopPropagation();
			// return false;
		});
		
		$collection.on('dragenter', function(event) {
			// hovering over drop target
			var e = event.originalEvent;
			e.dataTransfer.dropEffect = 'all';
			e.preventDefault();
			e.stopPropagation();
		});
		
		/*$collection.on('dragenter', function(event) {
			// hovering over drop target
			$(this).addClass('dragover');
			// console.log("dragenter", this);
		});
		$collection.on('dragleave', function(event) {
			// left drop target
			$(this).removeClass('dragover');
		});*/
		
		$collection.on('dragend', function(event) {
			// drag operation ended
			DragSort.dragging = false;
			// console.log("dragend");
		});
		
		$collection.on('drop', function(event) {
			// complete drop
			var e = event.originalEvent;
			if (e.preventDefault) e.preventDefault();
			if (e.stopPropagation) e.stopPropagation();
			
			var $drop = $(e.target);
			while (!$drop.data('drag_parent') && $drop.parent()) {
				$drop = $drop.parent();
			}
			
			// console.log("DROPPED ON ", $drop[0]);
			// console.log("DROP PARENT ", $drop.data('drag_parent') );
			
			// make sure drop is part of the correct collection
			if ($drop.data('drag_parent') != $cur.data('drag_parent')) return false;
			
			// make sure we didn't drop on ourselves
			if ($drop.data('drag_idx') == $cur.data('drag_idx')) return false;
			
			// see if we need to insert above or below target
			var above = true;
			var pos = $drop.offset();
			var height = $drop.height();
			var y = event.clientY;
			if (y > pos.top + (height / 2)) above = false;
			
			// remove element being dragged
			$cur.detach();
			
			// insert at new location
			if (above) $drop.before( $cur );
			else $drop.after( $cur );
			
			// fire callback, pass new sorted collection
			if (callback) callback( $cont.find(elem_sel) );
			
			return false;
		});
	},
	
	detach: function(cont_sel, elem_sel) {
		// remove all drag-drop augmentations from collection
		var $cont = $(cont_sel);
		var $collection = $cont.find(elem_sel);
		
		$collection.removeAttr('draggable');
		$collection.removeData( ['drag_parent', 'drag_idx'] );
		$collection.off('dragstart');
		$collection.off('dragover');
		$collection.off('drop');
	}
	
};
