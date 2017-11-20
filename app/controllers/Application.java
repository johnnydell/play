package controllers;

import common.Constants;

import play.*;
import play.mvc.*;
import views.html.*;

public class Application extends Controller {

    public static Result index() {
    	return redirect(Constants.LOGIN_PATH);
    }

}
