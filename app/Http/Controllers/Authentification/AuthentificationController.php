<?php

namespace App\Http\Controllers\Authentification;


use App\Http\Controllers\Controller;

use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Http\JsonResponse;


class AuthentificationController extends Controller
{

    /**
     * Display the login view.
     */
    public function create(): View
    {
        return view('authentification.login');
    }


    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        try {
            // dd($request->all());
            // $this->authenticate($request);
            $response = $request->authenticate();
            return new JsonResponse($response);

            // dd($response);
            // $request->session()->regenerate();


            // Connexion réussie, effectuez les opérations supplémentaires nécessaires

        } catch (ValidationException $e) {
            $errors = $e->errors();
            // Traitez les erreurs ici
        }

        // dd('ok');
        // $request->authenticate();

        // $request->session()->regenerate();

        // return redirect()->intended(RouteServiceProvider::HOME);
    }
}
