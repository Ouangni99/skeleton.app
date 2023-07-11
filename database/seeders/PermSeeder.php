<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'projet-creer',
            'projet-visualiser',
            'projet-modifier',
            'projet-supprimer',
        ];

        // Crée les nouvelles permissions
        foreach ($permissions as $permission) {
            Permission::create([
                'name'   => $permission,
                'active' => 1
            ]);
        }
    }
}
