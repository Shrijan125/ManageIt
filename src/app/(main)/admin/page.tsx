import NavBar from '@/components/NavBar/navbar';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AdminForm from '@/components/AdminForm/AdminForm';

const AdminPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Card className="mt-5 w-[95%] sm:w-[50%] mx-auto sm:mb-0 mb-5">
        <CardHeader>
          <CardTitle className="text-purple-200">Add Project</CardTitle>
          <CardDescription>
            Create a new project by providing its name, description, and
            relevant details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AdminForm></AdminForm>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
