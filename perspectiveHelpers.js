function calculateBackTilt(container) {
    let h = container.clientHeight;
    let w = container.clientWidth;
    let ho = h/4.5;
    let wo = w/3;

    let p1 = {}; p1.x=0+wo; p1.y=0+ho;
    let p2 = {}; p2.x=w-wo; p2.y=0+ho;
    let p3 = {}; p3.x=w; p3.y=h;
    let p4 = {}; p4.x=0; p4.y=h;

    let q1 = {}; q1.x=0; q1.y=0;
    let q2 = {}; q2.x=w; q2.y=0;
    let q3 = {}; q3.x=w; q3.y=h;
    let q4 = {}; q4.x=0; q4.y=h;

    let Mproj = [
        [q1.x, q2.x, q3.x],
        [q1.y, q2.y, q3.y],
        [1,1,1]
    ];

    let [a1,b1,y1] = getABY(q1,q2,q3,q4);
    Mproj = scaleCols(Mproj, a1,b1,y1);

    let Mdes = [
        [p1.x, p2.x, p3.x],
        [p1.y, p2.y, p3.y],
        [1,1,1]
    ];

    let [a2,b2,y2] = getABY(p1,p2,p3,p4);
    Mdes = scaleCols(Mdes, a2,b2,y2);

    // Transform = dot product of Mdes and Mproj^-1
    let inv = numeric.inv(Mproj);
    let htf = numeric.dot(Mdes, inv);

    let tf = matrix3to4(htf);
    let trans = "matrix3d(";
    trans += (tf[0][0] + ",");
    trans += (tf[1][0] + ",");
    trans += (tf[2][0] + ",");
    trans += (tf[3][0] + ",");

    trans += (tf[0][1] + ",");
    trans += (tf[1][1] + ",");
    trans += (tf[2][1] + ",");
    trans += (tf[3][1] + ",");

    trans += (tf[0][2] + ",");
    trans += (tf[1][2] + ",");
    trans += (tf[2][2] + ",");
    trans += (tf[3][2] + ",");

    trans += (tf[0][3] + ",");
    trans += (tf[1][3] + ",");
    trans += (tf[2][3] + ",");
    trans += (tf[3][3] + ")");

    container.style.transform=trans;
}

function getABY(p1,p2,p3,p4) {
    let m1 = [
        [p1.x, p2.x, p3.x],
        [p1.y, p2.y, p3.y],
        [1,1,1]
    ];

    let m2 = [
        [p4.x],
        [p4.y],
        [1]
    ];


    let result = numeric.solve(m1,m2);

    return [result[0],result[1],result[2]];
}

function scaleCols(matrix, c1,c2,c3) {
    matrix[0][0] = c1*matrix[0][0];
    matrix[1][0] = c1*matrix[1][0];
    matrix[2][0] = c1*matrix[2][0];

    matrix[0][1] = c2*matrix[0][1];
    matrix[1][1] = c2*matrix[1][1];
    matrix[2][1] = c2*matrix[2][1];

    matrix[0][2] = c3*matrix[0][2];
    matrix[1][2] = c3*matrix[1][2];
    matrix[2][2] = c3*matrix[2][2];

    return matrix;
}

function matrix3to4(three) {
    return [
        [three[0][0],three[0][1],0,three[0][2]],
        [three[1][0],three[1][1],0,three[1][2]],
        [0,0,1,0],
        [three[2][0],three[2][1],0,three[2][2]],
    ];
}
