$(function()
{
    $(document).on('click', '.btn-add', function(e)
    {
        e.preventDefault();

        var controlForm = $('.controls .form2'),
            currentEntry = $(this).parents('.voca:first'),
            newEntry = $(currentEntry.clone()).appendTo(controlForm);

        newEntry.find('input').val('');
        controlForm.find('.btn-add:not(:last)')
            .removeClass('btn-default').addClass('btn-danger')
            .removeClass('btn-add').addClass('btn-remove')
            
            .html('<span class="glyphicon glyphicon-minus" aria-hidden="true"></span> Remove   ');
    }).on('click', '.btn-remove', function(e)
    {
        
		$(this).parents('.voca:first').remove();

		e.preventDefault();
		return false;
	});
});