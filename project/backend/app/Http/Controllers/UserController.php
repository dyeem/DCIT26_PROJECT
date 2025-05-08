<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function register (Request $request) {
        
       // Validate input first
        $validator = Validator::make($request->all(), [
            'firstname' => 'required|string|max:255',
            'lastname' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'contact_number' => 'required|string|max:11',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Proceed with registration
        $user = new User();
        $user->firstname = $request->input('firstname');
        $user->lastname = $request->input('lastname');
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('password'));
        $user->contact_number = $request->input('contact_number');
        $user->save();

        return response()->json([
            'message' => 'User registered successfully!',
            'user' => $user
        ], Response::HTTP_CREATED);
    }

    public function login(Request $request){
        // 1. Validate the input
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Attempt to find user
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid email or password'], 401);
        }

        // 3. Login user via Laravel Sanctum
        Auth::login($user);

        // 4. Optionally regenerate session to prevent fixation
        $request->session()->regenerate();

        // 5. Respond with user data
        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                // add more fields only if needed
            ]
        ]);
    }

    public function users(Request $request) {
        
    }

}