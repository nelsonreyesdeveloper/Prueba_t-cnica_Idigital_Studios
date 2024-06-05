<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //crear roles y permisos

        $roleAdmin = Role::create(['name' => 'Administrador']);
        $permissionAdmin = Permission::create(['name' => 'all']);
        $roleAdmin->givePermissionTo($permissionAdmin);


        $roleUser = Role::create(['name' => 'Usuario']);
        $permissionUser = Permission::create(['name' => 'read']);
        $roleUser->givePermissionTo($permissionUser);



        // Crear el usuario Admin
        User::firstOrCreate([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123'),
        ])->assignRole($roleAdmin);

        // Crear el usuario User
        User::firstOrCreate([
            'name' => 'User',
            'email' => 'user@gmail.com',
            'password' => bcrypt('user123'),
        ])->assignRole($roleUser);
    }
}
