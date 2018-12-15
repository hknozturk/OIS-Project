[QueryItem="1"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT DISTINCT ?d
WHERE {
?d a :Doctor 
}

[QueryItem="2"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# Get the user and the symptoms + severity they provided

SELECT DISTINCT ?user ?symp ?severity
WHERE {
?user :provides ?hc .
?hc :contains ?symp .
?hc :severity ?severity

}

[QueryItem="3"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# Get the user and the symptoms + severity they provided

SELECT DISTINCT ?user ?diseaseID ?departmentName ?hospitalName ?DoctorName
WHERE {
?user :has_disease ?diseaseID .
?department :is_specialized ?diseaseID.
?department :

}

[QueryItem="4"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

# For each user, get its disease + the department, doctor and hospital that are specialized in that disease 

SELECT DISTINCT ?user ?diseaseID ?departmentName ?hospitalName ?doctorName
WHERE {
?user :has_disease ?diseaseID .
?department :is_specialized ?diseaseID .
?department :department_name ?departmentName .
?hospital :has_department ?department .
?hospital :hospital_name ?hospitalName .
?doctor :works ?department .
?doctor :doctor_name ?doctorName .

}

[QueryItem="5"]
PREFIX : <http://www.mydoc.be#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
SELECT ?p  ?h
WHERE {
?p a :User .
?p :height ?h
}
