<?php

namespace App\Admin\Controllers;

use App\Ruin;

use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Facades\Admin;
use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\ModelForm;

class RuinsController extends Controller
{
    use ModelForm;

    /**
     * Index interface.
     *
     * @return Content
     */
    public function index()
    {
        return Admin::content(function (Content $content) {

            $content->header('Ruins');

            $content->body($this->grid());
        });
    }

    /**
     * Edit interface.
     *
     * @param $id
     * @return Content
     */
    public function edit($id)
    {
        return Admin::content(function (Content $content) use ($id) {

            $content->header('header');
            $content->description('description');

            $content->body($this->form()->edit($id));
        });
    }

    /**
     * Create interface.
     *
     * @return Content
     */
    public function create()
    {
        return Admin::content(function (Content $content) {

            $content->header('header');
            $content->description('description');

            $content->body($this->form());
        });
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        return Admin::grid(Ruin::class, function (Grid $grid) {

            $grid->id('ID')->sortable();
            $grid->column('name')->sortable();
            $grid->column('name_tr');
            $grid->links('Links')->display(function ($link) {
                $count = count($link);
                return "<span class='label label-warning'>{$count}</span>";
            });
        });
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        return Admin::form(Ruin::class, function (Form $form) {

            $form->text('name', 'Name EN');
            $form->text('name_tr', 'Name TR');
            $form->text('slug', 'Slug');
            $form->textarea('information', 'Info EN');
            $form->textarea('information_tr', 'Info TR');
            $form->image('image');
            $form->text('latitude', 'Latitude');
            $form->text('longitude', 'Longitude');
            $form->text('tripadvisor', 'Tripadvisor');
            $form->text('foursquare', 'Foursquare');
            $form->radio('official_site', 'Official Site')->options([0 => 'Hayır', 1 => 'Evet'])->default(0);
            $form->text('official_site_en', 'Official Site EN');
            $form->text('official_site_tr', 'Official Site TR');
            
            $form->hasMany('links', function (Form\NestedForm $form) {
                $form->text('description', 'Description');
                $form->url('url', 'URL');
                $form->radio('language', 'Language')->options(['en' => 'EN', 'tr' => 'TR'])->default('tr');
            });
            
        });
    }
}
